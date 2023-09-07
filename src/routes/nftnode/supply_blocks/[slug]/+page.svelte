<script>
  /** @type {import('./$types').PageData} */
  export let data;

  import TopMenu from '../../../../components/top_menu.svelte';

  import Highlight from "svelte-highlight";
  import { javascript, json, plaintext } from "svelte-highlight/languages";
  import _style from "svelte-highlight/styles/an-old-hope.css";

  const title = "Banano NFT API"
  let issuer = data.issuer || 'ban_1bdaynbz85gw3tzzqh991kjegcetsjakjjg7wefee8r9jciiihk3gy76fpim';
  let result = '';
  let resultFromAddress = '';
  let endpointUrl = '';
  let curlRequest = '';
  let javascriptRequest = '';
  let host = 'https://cwispy.app'

  async function fetchData() {
    try {
      resultFromAddress = issuer;
      const response = await fetch(endpointUrl);
      const data = await response.json();
      result = JSON.stringify(data, null, 2);
      
    } catch (error) {
      result = `Error fetching data: ${error.message}`;
    }
  }

  async function updateBrowserHistoryState(uriEncodedIssuer) {
    try {
      history?.pushState(issuer, title, `/nftnode/supply_blocks/${uriEncodedIssuer}`);
    } catch (error) {
      console.error(`Error updating browser history state: ${error.message}`)
    }
  }

  $: {
    const uriEncodedIssuer = encodeURIComponent(issuer);
    let sanitizedHost = host.replace(/\/*$/, '');
    endpointUrl = `${sanitizedHost}/nft_api/issuer/${uriEncodedIssuer}/supply_blocks`;
    curlRequest = `curl -X GET ${endpointUrl}`
    javascriptRequest = `const issuer = "${issuer}";
const uriEncodedIssuer = encodeURIComponent(issuer);
const endpointUrl = \`${sanitizedHost}/nft_api/issuer/\${uriEncodedIssuer}/supply_blocks\`;
const response = await fetch(endpointUrl);
const data = await response.json();`;
    updateBrowserHistoryState(uriEncodedIssuer);
  }
  
</script>

<TopMenu selected={'supply_blocks'}/>

<h1>Supply blocks by issuer</h1>

<div class="mt-6">
  <label for="host" class="block text-sm font-medium text-stone-200">Enter host:</label>
  <input type="text" id="host" bind:value={host} placeholder="Enter host" class="p-3 mt-1 block w-full bg-stone-900 text-stone-100 rounded">
</div>

<div class="mt-6">
  <label for="issuer" class="block text-sm font-medium text-stone-200">Enter Issuer Address:</label>
  <input type="text" id="issuer" bind:value={issuer} placeholder="Enter owner address" class="p-3 mt-1 block w-full bg-stone-900 text-stone-100 rounded">
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
    <label for="result" class="block text-sm font-medium text-stone-200 my-2">{issuer == resultFromAddress ? 'Result:' : `Result (outdated):`}</label>
    <Highlight language={json} code={result}/>
  {/if}
</div>
