export const AZTECA_ORGANISATION_ID =
  "694a73e3-85ec-4c51-ae8f-9accd0bbd600";

export function usesAztecaLegacyCatalogue(
  organisationId: string | null | undefined
) {
  return organisationId === AZTECA_ORGANISATION_ID;
}

export const KOMMEE_DEMO_ORGANISATION_ID =
  "3a327991-668d-4f3f-b650-ac248f48b7c5";

export function usesKommeeDemoCatalogue(organisationId: string | null | undefined) {
  return organisationId === KOMMEE_DEMO_ORGANISATION_ID;
}
