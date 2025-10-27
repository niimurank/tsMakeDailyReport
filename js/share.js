const createOptionalSection = (label, value) => {
    const hasContent = value !== "";
    return `${label}\n${hasContent ? value : "なし"}`;
};

const getShare = () => {
    const shareElement = document.getElementById("share");
    const value = shareElement ? shareElement.value : "";

    return createOptionalSection(temp.common.share, value);
};
