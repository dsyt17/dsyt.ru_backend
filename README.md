# Endpoints:

## Auth
+ ***post*** `/auth/register`  
    - 'email': string, email
    - 'login': string, minLen: 5
    - 'nickname': string,  minLen: 3
    - 'password': string,  minLen: 3
    - 'fullName': string,  minLen: 3
    - 'avatarUrl'?: string, url
+ ***post*** `/auth/login`
    - 'loginOrEmail': string
    - 'password': string
+ ***get*** `/auth/me` (auth only)

## Users
+ ***get*** `/user/:nickname`

## Posts
+ ***get*** `/posts`
+ ***get*** `/posts/:id`
+ ***post*** `/posts` (auth only)
    - 'title': string, minLen: 1
    - 'text': string, minLen: 1
    - 'tags'?: array
    - 'imageUrl'?: string
+ ***delete*** `/posts/:id` (auth only)
+ ***patch*** `/posts/:id` (auth only)
    - 'title': string, minLen: 1
    - 'text': string, minLen: 1
    - 'tags'?: array
    - 'imageUrl'?: string
