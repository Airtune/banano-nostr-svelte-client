<script>
  export let selected;
</script>
<!--
  Heads up! 👋

  Plugins:
    - @tailwindcss/forms
-->

<div class="mb-5">
  <div class="sm:hidden">
    <label for="Tab" class="sr-only">Tab</label>

    <select
      id="Tab"
      class="w-full rounded-md border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
    >
      <option selected={selected === 'nfts'}>NFTs for owner</option>
      <option selected={selected === 'supply_blocks'}>Supply blocks by issuer</option>
      <option selected={selected === 'supply_block_mints'}>Supply block mints</option>
        <option selected={selected === 'nft_history'}>NFT History</option>
    </select>
  </div>

  <div class="hidden sm:block">
    <div class="border-b border-gray-200 dark:border-gray-700">
      <nav class="-mb-px flex gap-6" aria-label="Tabs">
        <a
          href="/nftnode/nfts"
          class={selected === 'nfts' ? 'top-menu-option-selected' : 'top-menu-option'}
        >
          NFTs for owner
        </a>

        <a
          href="/nftnode/supply_blocks"
          class={selected === 'supply_blocks' ? 'top-menu-option-selected' : 'top-menu-option'}
          aria-current="page"
        >
          Supply blocks by issuer
        </a>

        <a
          href="/nftnode/supply_block_mints"
          class={selected === 'supply_block_mints' ? 'top-menu-option-selected' : 'top-menu-option'}
          aria-current="page"
        >
          Supply block mints
        </a>
        <a
          href="/nftnode/nft_history"
          class={selected === 'nft_history' ? 'top-menu-option-selected' : 'top-menu-option'}
          aria-current="page"
        >
          NFT history
        </a>
      </nav>
    </div>
  </div>
</div>
