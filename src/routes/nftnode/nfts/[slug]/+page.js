/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  return {
    ownerAddress: params.slug,
  };
}
