export const AZTECA_ORGANISATION_ID =
  "694a73e3-85ec-4c51-ae8f-9accd0bbd600";

export function usesAztecaLegacyCatalogue(
  organisationId: string | null | undefined
) {
  return organisationId === AZTECA_ORGANISATION_ID;
}
