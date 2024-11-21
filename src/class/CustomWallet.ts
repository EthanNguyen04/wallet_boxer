import { Keypair, Transaction } from '@solana/web3.js'; // Import Transaction

export class CustomWallet {
  keypair: Keypair;

  constructor(keypair: Keypair) {
    this.keypair = keypair;
  }

  // Truyền khóa riêng của ví ra ngoài (getter)
  get secretKey(): Uint8Array {
    return this.keypair.secretKey;
  }

  // Truyền public key ra ngoài
  get publicKey() {
    return this.keypair.publicKey;
  }

  // Hàm ký giao dịch
  async signTransaction(transaction: Transaction): Promise<Transaction> {
    // Thực hiện ký giao dịch và trả về giao dịch đã ký
    transaction.partialSign(this.keypair);
    return transaction;
  }

  // Hàm ký tất cả giao dịch
  async signAllTransactions(transactions: Transaction[]): Promise<Transaction[]> {
    // Ký tất cả giao dịch và trả về mảng giao dịch đã ký
    return transactions.map(tx => {
      tx.partialSign(this.keypair);
      return tx;
    });
  }
}
