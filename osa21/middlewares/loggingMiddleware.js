const log = async ({ request, response }, next) => {
    console.log(`${request.method} ${request.url.pathname}`);
    await next();
  };
  
  export { log };