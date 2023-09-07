<script>
  /** @type {import('./$types').PageData} */
  export let data;

  import TopMenu from '../../../../components/top_menu.svelte';

  import Highlight from "svelte-highlight";
  import { javascript, json, plaintext } from "svelte-highlight/languages";
  import _style from "svelte-highlight/styles/an-old-hope.css";

  const title = "Banano NFT API"
  let supplyBlockHash = data.supplyBlockHash || '035F30B48459AF8EC086E7E6194A05940189E03BA5ACE6DB8B5CE22F3DE00A67';
  let result = '';
  let resultFromSupplyBlockHash = '';
  let endpointUrl = '';
  let curlRequest = '';
  let javascriptRequest = '';
  let host = 'https://cwispy.app'

  async function fetchData() {
    if (supplyBlockHash === '035F30B48459AF8EC086E7E6194A05940189E03BA5ACE6DB8B5CE22F3DE00A67') {
      if (!confirm("Warning. The birthday NFT mints json is ~5mb and might freeze your browser since there's no pagination yet. Are you sure you want to fetch all birthday NFTs?")) {
        return;
      }
    }
    try {
      resultFromSupplyBlockHash = supplyBlockHash;
      const response = await fetch(endpointUrl);
      const data = await response.json();
      result = JSON.stringify(data, null, 2);
      
    } catch (error) {
      result = `Error fetching data: ${error.message}`;
    }
  }

  async function updateBrowserHistoryState(uriEncodedSupplyBlockHash) {
    try {
      history?.pushState(supplyBlockHash, title, `/nftnode/supply_block_mints/${uriEncodedSupplyBlockHash}`);
    } catch (error) {
      console.error(`Error updating browser history state: ${error.message}`)
    }
  }

  $: {
    const uriEncodedSupplyBlockHash = encodeURIComponent(supplyBlockHash);
    let sanitizedHost = host.replace(/\/*$/, '');
    endpointUrl = `${sanitizedHost}/nft_api/supply_block/${uriEncodedSupplyBlockHash}/nfts`;
    curlRequest = `curl -X GET ${endpointUrl}`
    javascriptRequest = `const supplyBlockHash = "${supplyBlockHash}";
const uriEncodedSupplyBlockHash = encodeURIComponent(supplyBlockHash);
const endpointUrl = \`${sanitizedHost}/nft_api/supply_block/\${uriEncodedSupplyBlockHash}/nfts\`;
const response = await fetch(endpointUrl);
const data = await response.json();`;
    updateBrowserHistoryState(uriEncodedSupplyBlockHash);
  }
  
</script>

<TopMenu selected={'supply_block_mints'}/>

<h1>NFTs minted from supply block</h1>

<div class="mt-6">
  <label for="host" class="block text-sm font-medium text-stone-200">Enter host:</label>
  <input type="text" id="host" bind:value={host} placeholder="Enter host" class="p-3 mt-1 block w-full bg-stone-900 text-stone-100 rounded">
</div>

<div class="mt-6">
  <label for="supply-block-hash" class="block text-sm font-medium text-stone-200">Enter supply block hash:</label>
  <input type="text" id="supply-block-hash" bind:value={supplyBlockHash} placeholder="0000000000000000000000000000000000000000000000000000000000000000" class="p-3 mt-1 block w-full bg-stone-900 text-stone-100 rounded">
</div>

<div class="mt-6">
  <div class="block text-sm font-medium text-stone-200">Endpoint URL:</div>
  <div class="mt-1"><Highlight language={plaintext} code={endpointUrl}/></div>
</div>

<div class="mt-6">
  <div class="block text-sm font-medium text-stone-200">Curl:</div>
  <div class="mt-1"><Highlight language={plaintext} code={curlRequest}/></div>
</div>

<div class="mt-6">
  <div class="block text-sm font-medium text-stone-200">Javascript:</div>
  <div class="mt-1"><Highlight language={javascript} code={javascriptRequest}/></div>
</div>

{#if supplyBlockHash === "035F30B48459AF8EC086E7E6194A05940189E03BA5ACE6DB8B5CE22F3DE00A67"}
  <div class="mt-6">
    <button on:click={fetchData} class="bg-amber-600 text-white px-4 py-2 rounded">Fetch Data (Warning: Large request)</button>
  </div>
{:else}
  <div class="mt-6">
    <button on:click={fetchData} class="bg-amber-600 text-white px-4 py-2 rounded">Fetch Data</button>
  </div>
{/if}

<div class="mt-6">
  {#if result?.length > 0}
    <label for="result" class="block text-sm font-medium text-stone-200 my-2">{supplyBlockHash == resultFromSupplyBlockHash ? 'Result:' : `Result (outdated):`}</label>
    <Highlight language={json} code={result}/>
  {/if}
</div>
