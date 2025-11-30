import { PackageItem } from "./package-item";

export type GroupDetailsModalProps = {
  visible: boolean;
  onClose: () => void;
  groupKey: string | null;
  items: PackageItem[];
  receivedView: number;
  onPressItem: (item: PackageItem) => void;
};