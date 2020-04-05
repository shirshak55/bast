import React, { ReactElement } from "react";
import config from "next/config";
import { useClipboard, Code, Button } from "@chakra-ui/core";

const { API_URL, SCRIPT_URL } = config().publicRuntimeConfig;

const getSnippet = (
  userId: string | number,
  websiteId: string | number
): string => {
  return `<script>
  (function() {
    window.__bast__website_id = ${websiteId};
    window.__bast__user_id = ${userId};
    window.__bast__trackerUrl = "${API_URL}/ghost.png";

    var script = document.createElement('script');
    script.src = "${SCRIPT_URL}";
    script.async = false;
    document.head.appendChild(script);
  })();
</script>
`;
};

const CodeSnippet = ({
  user,
  website
}: {
  user: User;
  website: Website;
}): ReactElement => {
  const snippet = getSnippet(user.id, website.id);
  const { onCopy, hasCopied } = useClipboard(snippet);

  return (
    <Code
      my="2"
      borderRadius="md"
      p="4"
      position="relative"
      style={{ whiteSpace: "pre-wrap" }}
    >
      <Button
        onClick={onCopy}
        size="sm"
        variantColor="teal"
        position="absolute"
        right="5"
      >
        {hasCopied ? "Copied" : "Copy"}
      </Button>
      {snippet}
    </Code>
  );
};

export default CodeSnippet;