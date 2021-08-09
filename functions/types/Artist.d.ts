export default interface Artist {
  uid: string;
  displayName: string;
  socials: ArtistSocials[];
}

export interface ArtistSocials {
  provider: string;
  username: string;
}
