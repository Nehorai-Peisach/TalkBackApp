import './Triangle.css'

interface Props {
    number: number;
    triangleType: string;
    pieces: [];
}

export default function Triangle({number, triangleType, pieces}: Props) {
console.log(`index => ${number} ====> ${triangleType}`)
    return <div key={`triangle`+number} className={triangleType}>{pieces}</div>
}