export function txtSlicer(txt: string, max: number = 50) {
    if (txt.length >= max) return `${txt.slice(0, max)}...`;
    return txt;
}

export function numberWithCommas(x:string) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}