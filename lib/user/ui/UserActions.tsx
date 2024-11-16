import { UserRole } from "@prisma/client";
import { ButtonGroup, IconButton, Tooltip } from "@ui/index";
import { useRouter } from "next/router";
import { FiUser } from "react-icons/fi";
import { RiProfileLine } from "react-icons/ri";

export const UserActions = ({
  rowData,
  refetch,
}: {
  rowData: any;
  refetch: () => void;
}) => {
  const router = useRouter();

  return (
    <ButtonGroup
      spacing="0"
      colorScheme="green"
      variant="ghost"
      size="sm"
      float="left"
    >
      <Tooltip label="User Profile">
        <IconButton
          icon={<FiUser />}
          aria-label="User Profile"
          onClick={() => router.push(`/admin/user/${rowData.id}`)}
        />
      </Tooltip>
      {rowData.role === UserRole.USER && (
        <Tooltip label="Patient Overview">
          <IconButton
            icon={<RiProfileLine />}
            aria-label="Patient Overview"
            onClick={() => router.push(`/local-doctor/patient/${rowData.id}`)}
          />
        </Tooltip>
      )}
    </ButtonGroup>
  );
};
