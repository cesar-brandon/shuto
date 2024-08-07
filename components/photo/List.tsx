import { XStack } from "tamagui";
import { PhotoCard } from "./Card";

const list = [
  {
    id: 1,
    title: "Sony A7IV",
    image:
      "https://i.pinimg.com/564x/da/ce/68/dace684a8149f8e913960e5e8706dae9.jpg",
  },
  {
    id: 2,
    title: "Canon EOS R5",
    image:
      "https://i.pinimg.com/564x/cc/00/06/cc00066f59a52e8841b23a322d2b35a7.jpg",
  },
  {
    id: 3,
    title: "Nikon Z7",
    image:
      "https://i.pinimg.com/564x/81/0e/1c/810e1cf2974f9f38ec67e4feb7fa08af.jpg",
  },
  {
    id: 4,
    title: "Fujifilm X-T4",
    image:
      "https://i.pinimg.com/564x/58/e4/01/58e401f3573ef4ae85d7a3445a9b259b.jpg",
  },
  {
    id: 5,
    title: "Panasonic Lumix S5",
    image:
      "https://i.pinimg.com/736x/bf/5f/91/bf5f91a7e5e57fe0860835869bd22fd9.jpg",
  },
  {
    id: 6,
    title: "Leica SL2",
    image:
      "https://i.pinimg.com/564x/6a/02/9c/6a029cc5c0ce5b38c2a01ab5392fa6ec.jpg",
  },
  {
    id: 7,
    title: "Olympus OM-D E-M1 Mark III",
    image:
      "https://i.pinimg.com/564x/ff/62/e7/ff62e775a6118bd8441a399615a508eb.jpg",
  },
];

//NOTE: intentar: $sm={{ flexDirection: "column" }}
export function PhotoList() {
  return (
    <XStack flex={1} flexWrap="wrap" gap="$4" justifyContent="center">
      {list.map((item, i) => (
        <PhotoCard key={i} item={item} />
      ))}
    </XStack>
  );
}
