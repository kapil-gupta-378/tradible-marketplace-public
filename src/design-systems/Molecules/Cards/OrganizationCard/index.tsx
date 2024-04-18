import { OrganizationCardProps } from './interface'

import Image from 'design-systems/Atoms/Image'
import Typography from 'design-systems/Atoms/Typography'
import Button from 'design-systems/Atoms/Button'
import { useOrganizationContext } from 'contexts/OrganizationContext'

const OrganizationCard: React.FC<OrganizationCardProps> = ({
  id,
  ProfileImage,
  name,
  role,
  status,
  isRemoveOrganization = false,
  handleSingleOrganization,
  createdBy,
  isSingleOrganization,
}) => {
  const { setActiveOrganization, DeleteUserOrganization, activeOrganization } = useOrganizationContext()

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex justify-start gap-4">
        <div
          className="h-11 w-11 cursor-pointer overflow-hidden rounded-full border bg-neutral-800 dark:border-neutral-light-600"
          onClick={handleSingleOrganization}
        >
          {ProfileImage && ProfileImage.includes('http') && (
            <Image
              alt={`Organization Image`}
              className="h-11 w-11 rounded-full"
              height={100}
              src={ProfileImage}
              width={100}
            />
          )}
        </div>
        <div className="text-left">
          <div className="cursor-pointer" onClick={handleSingleOrganization}>
            <Typography className="capitalize text-neutral-100 dark:text-white" size="h6" variant="regular">
              {name}
            </Typography>
          </div>
          <Typography
            className="!font-medium text-neutral-400 dark:!text-neutral-light-300"
            size="paragraph"
            variant="regular"
          >
            {role}
          </Typography>
        </div>
      </div>
      <div>
        {isRemoveOrganization && role?.toLocaleLowerCase() === 'owner' ? (
          <Button
            className="!p-0 text-sm font-semibold text-red-100"
            color="secondary"
            onClick={() => DeleteUserOrganization.mutate({ orgId: id, action: 'remove' })}
          >
            Delete
          </Button>
        ) : (
          <div onClick={() => setActiveOrganization(id)}>
            <Button
              className="!p-0 text-sm font-semibold text-neutral-400 dark:text-neutral-light-300"
              color="secondary"
            >
              {status}
            </Button>
          </div>
        )}

        {isSingleOrganization && (
          <Button
            className="!p-0 text-sm font-semibold text-red-100"
            color="secondary"
            onClick={() =>
              DeleteUserOrganization.mutate({ orgId: activeOrganization, action: 'remove', userIds: [id] })
            }
          >
            Leave
          </Button>
        )}
      </div>
    </div>
  )
}

export default OrganizationCard
