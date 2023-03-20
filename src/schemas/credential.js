export const credentialSchema = `
@public
collection Credential {
  id: string;
  publicKey: PublicKey;
  username: string;
  password: string;

  constructor (id: string, username: string, password: string) {
    this.id = id;
    this.publicKey = ctx.publicKey;
    this.username = username;
    this.password = password;
  }

  function setCredentials (username: string, password: string) {
    if (ctx.publicKey != this.publicKey) {
      error('You are not the creator of this record.');
    }
    this.username = username;
    this.password = password;
  }

  function del () {
    if (ctx.publicKey != this.publicKey) {
      throw error();
    }
    selfdestruct();
  }
}
`;
