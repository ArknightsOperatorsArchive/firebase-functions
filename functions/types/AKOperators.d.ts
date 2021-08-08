export default interface AKOperator {
  uid: string;
  name: string;
  class: OperatorClass;
}

export type OperatorClass =
  | "Caster"
  | "Defender"
  | "Guard"
  | "Medic"
  | "Sniper"
  | "Specialist"
  | "Supporter"
  | "Vanguard";
