function convert(str){
    console.log(str)
    return str = str.replace(/&nbsp;/g, " ")
        .replace(/&lt;/g, "‹")
        .replace(/&gt;/g, "›")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&copy;/g, "©")
        .replace(/&reg;/g, "®")
        .replace(/&times;/g, "×")
        .replace(/&divide;/g, "÷")
        .replace(/&#39;/g, "'")
        .replace(/\n/g, "<br>");
}

module.exports = convert;