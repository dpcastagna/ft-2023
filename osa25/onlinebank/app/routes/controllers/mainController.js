const showMain = async ({ response, render, state }) => {
  if (await state.session.get("authenticated")) {
    response.redirect("/accounts");
  } else {
    response.redirect("/auth/login");
  }
};

export { showMain };
