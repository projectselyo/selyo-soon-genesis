interface TruncatedTextSplitProps {
  text?: string;
  startChars?: number;
  endChars?: number;
}

interface UserData {
  user: {
    email: string;
    publicKey: string;
    uid: string;
  };
  items: Array<{
    id: string;
    collectionKey: string;
    metadata: {
      name: string;
      symbol: string;
      image: string;
      attributes: Array<{
        trait_type: string;
        value: string;
      }>;
    };
  }>;
}

interface Params {
  uid: string;
  poll: string;
  choice: string;
}
