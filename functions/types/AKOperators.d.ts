export default interface AKOperator {
  uid: string;
  name: string;
  class: OperatorClass;
  rarity?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export type OperatorClass =
  | "Caster"
  | "Defender"
  | "Guard"
  | "Medic"
  | "Sniper"
  | "Specialist"
  | "Supporter"
  | "Vanguard"
  | "Other";
