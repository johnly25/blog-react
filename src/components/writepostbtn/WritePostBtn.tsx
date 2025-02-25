import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { PostModal } from "../postmodal/PostModal";

export function WritePostBtn() {
    const [opened, { close, open }] = useDisclosure(false);
    return (<>
        <Button
            variant="light"
            leftSection={<IconEdit size={14} />}
            onClick={open}
        >
            Write Post
        </Button>
        <PostModal open={open} opened={opened} close={close}/>
    </>
    )
}