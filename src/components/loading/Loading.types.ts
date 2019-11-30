export default interface ILoadingProps {
  error?: boolean;
  timedOut?: boolean;
  pastDelay?: boolean;
  retry: Function;
}
