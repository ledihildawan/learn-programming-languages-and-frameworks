import van from 'vanjs-core';

const { div, p, } = van.tags;

export const userPage = (params: { userId: string }) => div('User Page', p('userId: ' + params.userId));
