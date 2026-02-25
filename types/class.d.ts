type classValue = classArray | string | false | null | undefined
type classArray = classValue[]

export interface classValue {
  className?: string | false | null | undefined
}
