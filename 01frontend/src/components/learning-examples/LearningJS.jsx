const person = {
    name: 'Jingyi',
    address: {
        line1: '12258 NE 12th Ln',
        City: 'Bellevue',
        country: 'US'
    },
    profiles: ['twitter','Wechat','instagram'],
    printProfile:() => {
        person.profiles.map(
            (profile) => {console.log(profile)}
        )
    }

}


export default function LearningJS(){

    return(
        <>
        <div>{person.name}</div>
        <div>{person.address.line1}</div>
        <div>{person.profiles[1]}</div>
        <div>{person.printProfile()}</div>
        </>
    )
}