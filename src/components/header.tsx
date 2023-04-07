interface HeaderProps {
    title: string
}

const Header = (props: HeaderProps) => {
    return (
        <div style={{display: "flex", justifyContent: 'center', alignItems: 'center'}}>
            <h2>{props.title}</h2>
        </div>
    )
}

export default Header;