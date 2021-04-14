export default function Value(value=0) {
    this.value = value;

    this.concat = input => {
        if (this.value !== 0) {
            this.value += input;
        }
        
        if (this.value === 0) {
            this.value = input;
        }
    }
}