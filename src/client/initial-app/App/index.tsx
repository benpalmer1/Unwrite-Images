import type { FileDropEvent } from 'file-drop-element';
import type SnackBarElement from 'shared/custom-els/snack-bar';
import type { SnackOptions } from 'shared/custom-els/snack-bar';

import { h, Component } from 'preact';

import { linkRef } from 'shared/prerendered-app/util';
import * as style from './style.css';
import 'add-css:./style.css';
import 'add-css:shared/prerendered-app/colors.css';
import 'add-css:shared/prerendered-app/util.css';
import 'file-drop-element';
import 'shared/custom-els/snack-bar';
import Intro from 'shared/prerendered-app/Intro';
import 'shared/custom-els/loading-spinner';

const ROUTE_EDITOR = '/editor';

const compressPromise = import('client/lazy-app/Compress');
// In embedded usage (Unwrite), disable service worker integration.
declare const __EMBEDDED__: boolean;
const swBridgePromise: Promise<{
  offliner: (showSnack: any) => void;
  getSharedImage: () => Promise<File | undefined>;
}> = __EMBEDDED__
  ? Promise.resolve({
      offliner: () => {},
      getSharedImage: async () => undefined,
    })
  : import('client/lazy-app/sw-bridge');

function back() {
  window.history.back();
}

interface Props {
  onEditorStateChange?: (isOpen: boolean) => void;
}

interface State {
  awaitingShareTarget: boolean;
  file?: File;
  isEditorOpen: boolean;
  Compress?: typeof import('client/lazy-app/Compress').default;
}

export default class App extends Component<Props, State> {
  state: State = {
    awaitingShareTarget: new URL(location.href).searchParams.has(
      'share-target',
    ),
    isEditorOpen: false,
    file: undefined,
    Compress: undefined,
  };

  snackbar?: SnackBarElement;
  private previousBodyOverflow?: string;

  constructor() {
    super();

    compressPromise
      .then((module) => {
        this.setState({ Compress: module.default });
      })
      .catch(() => {
        this.showSnack('Failed to load app');
      });

    swBridgePromise.then(async ({ offliner, getSharedImage }) => {
      offliner(this.showSnack);
      if (!this.state.awaitingShareTarget) return;
      const file = await getSharedImage();
      // Remove the ?share-target from the URL
      history.replaceState('', '', '/');
      this.openEditor();
      this.setState({ file, awaitingShareTarget: false });
    });

    // Since iOS 10, Apple tries to prevent disabling pinch-zoom. This is great in theory, but
    // really breaks things on Squoosh, as you can easily end up zooming the UI when you mean to
    // zoom the image. Once you've done this, it's really difficult to undo. Anyway, this seems to
    // prevent it.
    document.body.addEventListener('gesturestart', (event: any) => {
      event.preventDefault();
    });
  }

  componentDidMount() {
    window.addEventListener('popstate', this.onPopState);
    const isEditorOpen = location.pathname === ROUTE_EDITOR;
    if (isEditorOpen !== this.state.isEditorOpen) {
      this.setState({ isEditorOpen });
    }
    this.applyEditorModeEffects(isEditorOpen);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.isEditorOpen !== this.state.isEditorOpen) {
      this.applyEditorModeEffects(this.state.isEditorOpen);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.onPopState);
    this.applyEditorModeEffects(false);
  }

  private onFileDrop = ({ files }: FileDropEvent) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    this.openEditor();
    this.setState({ file });
  };

  private onIntroPickFile = (file: File) => {
    this.openEditor();
    this.setState({ file });
  };

  private showSnack = (
    message: string,
    options: SnackOptions = {},
  ): Promise<string> => {
    if (!this.snackbar) throw Error('Snackbar missing');
    return this.snackbar.showSnackbar(message, options);
  };

  private applyEditorModeEffects(isOpen: boolean) {
    this.props.onEditorStateChange?.(isOpen);

    if (typeof document === 'undefined') {
      return;
    }

    const body = document.body;

    if (isOpen) {
      if (this.previousBodyOverflow === undefined) {
        this.previousBodyOverflow = body.style.overflow;
      }
      body.style.overflow = 'hidden';
    } else {
      if (this.previousBodyOverflow !== undefined) {
        body.style.overflow = this.previousBodyOverflow;
        this.previousBodyOverflow = undefined;
      } else {
        body.style.removeProperty('overflow');
      }
    }
  }

  private onPopState = () => {
    this.setState({ isEditorOpen: location.pathname === ROUTE_EDITOR });
  };

  private openEditor = () => {
    if (this.state.isEditorOpen) return;
    // Change path, but preserve query string.
    const editorURL = new URL(location.href);
    editorURL.pathname = ROUTE_EDITOR;
    history.pushState(null, '', editorURL.href);
    this.setState({ isEditorOpen: true });
  };

  render(
    {}: Props,
    { file, isEditorOpen, Compress, awaitingShareTarget }: State,
  ) {
    const showSpinner = awaitingShareTarget || (isEditorOpen && !Compress);
    const containerClass = isEditorOpen
      ? `${style.app} ${style.appFullScreen}`
      : style.app;

    return (
      <div class={containerClass}>
        <file-drop onfiledrop={this.onFileDrop} class={style.drop}>
          {showSpinner ? (
            <loading-spinner class={style.appLoader} />
          ) : isEditorOpen ? (
            Compress && (
              <Compress file={file!} showSnack={this.showSnack} onBack={back} />
            )
          ) : (
            <Intro onFile={this.onIntroPickFile} showSnack={this.showSnack} />
          )}
          <snack-bar ref={linkRef(this, 'snackbar')} />
        </file-drop>
      </div>
    );
  }
}
