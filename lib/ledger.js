const Ledger = {
  getBlockByHash(
    blockHash: string,
    provider: Provider,
    callback: Callback<JsonRPCResponse>
  ) {
    const params = [blockHash, true];
    provider.send(
      {
        jsonrpc: "2.0",
        method: "eth_getBlockByHash",
        params,
        id: Date.now()
      },
      callback
    );
  },

  parse(uri: string) {
    const parsed: parsedUriObject = {};
    if (uri.indexOf("blockchain://") !== 0) return parsed;

    const cleanUri = uri.replace("blockchain://", "");

    const pieces = cleanUri.split("/block/");

    parsed.genesis_hash = `0x${pieces[0]}`;
    parsed.block_hash = `0x${pieces[1]}`;

    return parsed;
  },


};

export = Blockchain;
