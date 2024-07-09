import { getCookie  } from './cookies';

export async function checkLoginRedirect(nav){
    const response = await fetch(`/user/check`, {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'),
        },
        credentials: 'include', 
        method: 'GET',
    });

    if (response.status === 401){
        return nav('/login')
    }
} 