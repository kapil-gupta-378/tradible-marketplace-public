import { UserInterface } from 'types/global'

export interface ProfileTemplateProps {
  active: string
  handleActive: React.Dispatch<React.SetStateAction<string>>
  userData: UserInterface | undefined
}
