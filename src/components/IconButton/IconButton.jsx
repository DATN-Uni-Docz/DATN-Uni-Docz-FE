import classes from "./IconButton.module.css"
const IconButton = ({onClick, children, type}) => {
    return (
        <div className={classes.icon_button} onClick={onClick}>
            {children}
        </div>
    )
}

export default IconButton