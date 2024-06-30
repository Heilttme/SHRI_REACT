import React, { useState } from "react";
import User from "@assets/User.tsx";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import LoginModal from "../login-modal/login-modal.component";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "@app/types";
import { logout } from "entities/user/userSlice";

const Header = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const isAuthorised = useSelector((state: StoreType) => state.user.authorised);
  const dispatch = useDispatch()

  const submitLogout = () => {
    localStorage.clear()
    dispatch(logout())
  }

  return (
    <div className="bg-[#333333] w-full sticky top-0 flex justify-between items-center p-4 z-10">
      <Link to={"/films"}>
        <h1 className="text-2xl text-white">Фильмопоиск</h1>
      </Link>
      {!isAuthorised ? (
        <Button
          onClick={() => setIsModalOpened((prev) => !prev)}
          className="border-red-500 bg-red-500 border text-white rounded-lg px-2 py-1 hover:bg-red-500"
        >
          Войти
        </Button>
      ) : (
        <div className="flex items-center gap-4">
          <User />
          <Button onClick={submitLogout} className="border-red-500 bg-transparent border text-red-500 rounded-lg px-2 py-1 hover:bg-transparent hover:text-red-500">
            Выйти
          </Button>
        </div>
      )}
      <LoginModal
        opened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
      />
    </div>
  );
};

export default Header;
