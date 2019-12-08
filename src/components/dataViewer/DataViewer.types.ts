export default interface IDataViewerProps {
  isLoading?: boolean;
  hideSpinner?: boolean;
  isEmpty?: boolean;
  errorMessage?: string;
  isEmptyText?: string;
  children: any;
}
