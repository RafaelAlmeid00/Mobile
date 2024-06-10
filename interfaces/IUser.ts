export interface IUser {
    userCPF: string,
    userNome: string,
    userEmail: string,
    userSenha: string,
    userNascimento: string,
    userEndCEP: string,
    userEndUF: string,
    userEndbairro: string,
    userEndrua: string,
    userEndnum: number,
    userEndcomplemento?: string,
    userEndcidade: string,
    userTipo?: string,
    listCpfListId?: number,
    userStatus: string,
    listCpfList?: string
}

export type UserDataIndex = {
    [key: string]: string | number | undefined;
  }