import { h, Component } from 'preact';

import { linkRef } from 'shared/prerendered-app/util';
import '../../custom-els/loading-spinner';
import * as style from './style.css';
import 'add-css:./style.css';
import type SnackBarElement from 'shared/custom-els/snack-bar';
import 'shared/custom-els/snack-bar';
import { startBlobs } from './blob-anim/meta';

const blobAnimImport =
  !__PRERENDER__ && matchMedia('(prefers-reduced-motion: reduce)').matches
    ? undefined
    : import('./blob-anim');
const supportsClipboardAPI =
  !__PRERENDER__ && navigator.clipboard && navigator.clipboard.read;

async function getImageClipboardItem(
  items: ClipboardItem[],
): Promise<undefined | Blob> {
  for (const item of items) {
    const type = item.types.find((type) => type.startsWith('image/'));
    if (type) return item.getType(type);
  }
}

interface Props {
  onFile?: (file: File) => void;
  showSnack?: SnackBarElement['showSnackbar'];
}
interface State {
  beforeInstallEvent?: BeforeInstallPromptEvent;
  showBlobSVG: boolean;
}

export default class Intro extends Component<Props, State> {
  state: State = {
    showBlobSVG: true,
  };
  private fileInput?: HTMLInputElement;
  private blobCanvas?: HTMLCanvasElement;
  private installingViaButton = false;

  componentDidMount() {
    window.addEventListener(
      'beforeinstallprompt',
      this.onBeforeInstallPromptEvent,
    );

    window.addEventListener('appinstalled', this.onAppInstalled);

    if (blobAnimImport) {
      blobAnimImport.then((module) => {
        this.setState(
          {
            showBlobSVG: false,
          },
          () => module.startBlobAnim(this.blobCanvas!),
        );
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener(
      'beforeinstallprompt',
      this.onBeforeInstallPromptEvent,
    );
    window.removeEventListener('appinstalled', this.onAppInstalled);
  }

  private onFileChange = (event: Event): void => {
    const onFile = this.props.onFile;
    if (!onFile) return;
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files && fileInput.files[0];
    if (!file) return;
    this.fileInput!.value = '';
    onFile(file);
  };

  private onOpenClick = () => {
    this.fileInput?.click();
  };

  private onBeforeInstallPromptEvent = (event: BeforeInstallPromptEvent) => {
    event.preventDefault();
    this.setState({ beforeInstallEvent: event });
  };

  private onInstallClick = async (event: Event) => {
    event.preventDefault();
    const beforeInstallEvent = this.state.beforeInstallEvent;
    if (!beforeInstallEvent) return;

    this.installingViaButton = true;
    beforeInstallEvent.prompt();

    const { outcome } = await beforeInstallEvent.userChoice;
    if (outcome === 'dismissed') {
      this.installingViaButton = false;
    }
  };

  private onAppInstalled = () => {
    this.setState({ beforeInstallEvent: undefined });

    if (document.hidden) return;
    this.installingViaButton = false;
  };

  private onPasteClick = async (event: Event) => {
    event.stopPropagation();
    if (!supportsClipboardAPI) return;

    let clipboardItems: ClipboardItem[];

    try {
      clipboardItems = await navigator.clipboard.read();
    } catch (err) {
      this.props.showSnack?.(`No permission to access clipboard`);
      return;
    }

    const blob = await getImageClipboardItem(clipboardItems);

    if (!blob) {
      this.props.showSnack?.(`No image found in the clipboard`);
      return;
    }

    this.props.onFile?.(new File([blob], 'image.unknown'));
  };

  render({}: Props, { beforeInstallEvent, showBlobSVG }: State) {
    const showInstallPrompt = !__PRERENDER__ && Boolean(beforeInstallEvent);

    return (
      <div class={style.intro}>
        <input
          class={style.hide}
          ref={linkRef(this, 'fileInput')}
          type="file"
          onChange={this.onFileChange}
        />
        <div class={style.main}>
          {!__PRERENDER__ && (
            <canvas
              ref={linkRef(this, 'blobCanvas')}
              class={style.blobCanvas}
            />
          )}

          {showInstallPrompt && (
            <button class={style.installBtn} onClick={this.onInstallClick}>
              Install
            </button>
          )}

          <div class={style.loadImg}>
            <h2 class={style.sectionHeading}>Upload Your Image</h2>
            {showBlobSVG && (
              <svg
                class={style.blobSvg}
                viewBox="-1.25 -1.25 2.5 2.5"
                preserveAspectRatio="xMidYMid slice"
              >
                {startBlobs.map((points) => (
                  <path
                    d={points
                      .map((point, i) => {
                        const nextI = i === points.length - 1 ? 0 : i + 1;
                        let d = '';
                        if (i === 0) {
                          d += `M${point[2]} ${point[3]}`;
                        }
                        return (
                          d +
                          `C${point[4]} ${point[5]} ${points[nextI][0]} ${points[nextI][1]} ${points[nextI][2]} ${points[nextI][3]}`
                        );
                      })
                      .join('')}
                  />
                ))}
              </svg>
            )}
            <div
              class={style.loadImgContent}
              style={{ visibility: __PRERENDER__ ? 'hidden' : '' }}
              onClick={this.onOpenClick}
            >
              <div class={style.loadBtn}>
                <svg viewBox="0 0 24 24" class={style.loadIcon}>
                  <path d="M5 20h14v-2H5v2zm0-10h4v6h6v-6h4l-7-7-7 7z" />
                </svg>
              </div>
              <p class={style.loadHeading}>
                Drop your image here or click to browse
              </p>
              <div class={style.loadActions}>
                {supportsClipboardAPI ? (
                  <span>
                    or{' '}
                    <button class={style.pasteBtn} onClick={this.onPasteClick}>
                      paste from clipboard
                    </button>
                  </span>
                ) : (
                  'or paste from clipboard'
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
