export default function createInitialApplicantState() {
  return {
    selectedApplicant: null,
    isFetching: false,
    error: null,
    applicants: []
  };
}
