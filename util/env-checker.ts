function Checker(venv: string | undefined): string {
    if(venv === undefined) {
        return ""
    } else {
        return venv
    }
}

export default Checker