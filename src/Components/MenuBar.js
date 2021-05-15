import React, { useContext } from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/auth';

export default function MenuBar(props) {
    const { user, logout } = useContext(AuthContext);


    return (
        <div>
            <Menu attached='top'>
                <Dropdown 
                    item 
                    icon='book' 
                    simple
                    >
                    <Dropdown.Menu>
                    <Dropdown.Item
                        as={Link}
                        to={'/settings'}
                    >Account settings</Dropdown.Item>
                    <Dropdown.Item 
                        as={Link} 
                        to={'/'}
                        onClick={logout}
                    >
                            Log out
                    </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Menu.Item 
                    name={`Welcome ${user.username}`}
                    as={Link}
                    to={'/home'}
                    onClick={() => console.log(user)}
                />
                <Menu.Menu position='right'>
                    <div className='ui right aligned category search item'>
                    <div className='ui transparent icon input'>
                        <input
                        className='prompt'
                        type='text'
                        placeholder='Search books...'
                        onChange={e => props.setSearchTerm(e.target.value)}
                        />
                        <i className='search link icon' />
                    </div>
                    <div className='results' />
                    </div>
                </Menu.Menu>
            </Menu>
        </div>
    )
}
