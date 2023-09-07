<script>
  /** @type {import('./$types').PageData} */
  export let data;

  import Highlight from "svelte-highlight";
  import { javascript, json, plaintext } from "svelte-highlight/languages";
  import _style from "svelte-highlight/styles/an-old-hope.css";
  import TopMenu from "../../../../components/top_menu.svelte";

  const title = "Banano NFT API"
  let nftRepresentative = data.nftRepresentative || 'ban_3ra3j9abpxidodetmwbe3sc5dsbn7mekh9duu7j4wnk7aznwxezy7e3g6dne';
  let result = '';
  let resultFromNFTRepresentative = '';
  let endpointUrl = '';
  let curlRequest = '';
  let javascriptRequest = '';
  let host = 'https://cwispy.app'

  async function fetchData() {
    try {
      resultFromNFTRepresentative = nftRepresentative;
      const response = await fetch(endpointUrl);
      const data = await response.json();
      result = JSON.stringify(data, null, 2);
      
    } catch (error) {
      result = `Error fetching data: ${error.message}`;
    }
  }

  async function updateBrowserHistoryState(uriEncodedNFTRepresentative) {
    try {
      history?.pushState(nftRepresentative, title, `/nftnode/nfts/${uriEncodedNFTRepresentative}`);
    } catch (error) {
      console.error(`Error updating browser history state: ${error.message}`)
    }
  }

  $: {
    const uriEncodedNFTRepresentative = encodeURIComponent(nftRepresentative);
    let sanitizedHost = host.replace(/\/*$/, '');
    endpointUrl = `${sanitizedHost}/nft_api/nft/${uriEncodedNFTRepresentative}/history`;
    curlRequest = `curl -X GET ${endpointUrl}`
    javascriptRequest = `const nftRepresentative = "${escape(nftRepresentative)}";
const uriEncodedNFTRepresentative = encodeURIComponent(nftRepresentative);
const endpointUrl = \`${sanitizedHost}/nft_api/nft/\${uriEncodedNFTRepresentative}/history\`;
const response = await fetch(endpointUrl);
const data = await response.json();`;
    updateBrowserHistoryState(uriEncodedNFTRepresentative);
  }
  
</script>

<TopMenu selected={'nft_history'}/>

<h1>History for NFT</h1>

<div class="mt-6">
  <label for="host" class="block text-sm font-medium text-stone-200">Enter host:</label>
  <input type="text" id="host" bind:value={host} placeholder="Enter host" class="p-3 mt-1 block w-full bg-stone-900 rounded text-stone-200">
</div>

<div class="mt-6">
  <label for="nftRepresentative" class="block text-sm font-medium text-stone-200">Enter Owner Address:</label>
  <input type="text" id="nftRepresentative" bind:value={nftRepresentative} placeholder="Enter owner address" class="p-3 mt-1 block w-full bg-stone-900 rounded text-stone-200">
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

<div class="mt-6">
  <button on:click={fetchData} class="bg-amber-600 text-white px-4 py-2 rounded">Fetch Data</button>
</div>

<div class="mt-6">
  {#if result?.length > 0}
    <label for="result" class="block text-sm font-medium text-stone-200 my-2">{nftRepresentative == resultFromNFTRepresentative ? 'Result:' : `Result (outdated):`}</label>
    <Highlight language={json} code={result}/>
  {/if}
</div>
