const getRemaining = () => {
    const remainingElement = document.getElementById("remaining");
    const value = remainingElement ? remainingElement.value : "";

    return createOptionalSection(temp.common.remaining, value);
};

// 既存コードとの互換性維持のためのエイリアス
const getRemailing = getRemaining;
