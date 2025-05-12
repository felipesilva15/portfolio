import { DialogSize } from "../shared/enums/dialog-size";

export interface DynamicDialogConfig {
    title?: string;
    data?: object;
    size?: DialogSize;
    closeable?: boolean;
    styleClass?: string;
}
