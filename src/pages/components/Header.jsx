import Link from "next/link";

export default function Header() {
  return (
    <div className=" max-w-[90%] m-auto">
      <div className="flex justify-center items-center p-3 font-semibold">
        <Link href="/" className="flex h-[80px] px-[10px]">
          <img
            src="https://scontent.fuln2-2.fna.fbcdn.net/v/t39.30808-6/300377072_383054243993365_3738502487860552100_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=coPjlKHuKoAQ7kNvwFOj12k&_nc_oc=AdlOcxgzTHzuC2sQV8bR97u7AMIVA3UNnWGxz8IhnrZhXzpZTs5A6btTRo5cPObSUlU&_nc_zt=23&_nc_ht=scontent.fuln2-2.fna&_nc_gid=5r4hgywh3xuTjFb6bs2u9w&oh=00_Afb968l8IBsAtqk2i0jUblYjGQG4LRFPLQ1LgNQIbk6xMg&oe=68E240AC"
            alt=""
          />
        </Link>
        <p className="text-3xl text-center">
          Хөвсгөл аймгийн Мөрөн сумын ерөнхий боловсролын "АВЬЯАС" сургуулийн
          хөтөч
        </p>
      </div>
    </div>
  );
}
