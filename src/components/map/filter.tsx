import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { CollectionCategory } from "../../data/map";
import { ReactComponent as PaperMarkerIcon } from "../../assets/paper.svg";
import { ReactComponent as PlasticMarkerIcon } from "../../assets/plastic.svg";
import { ReactComponent as ClothMarkerIcon } from "../../assets/cloth.svg";
import { ReactComponent as ElectronicDevicesMarkerIcon } from "../../assets/electronic_devices.svg";
import { ReactComponent as BatteriesMarkerIcon } from "../../assets/batteries.svg";
import { ReactComponent as GlassMarkerIcon } from "../../assets/glass.svg";
import { ReactComponent as GreenPointsMarkerIcon } from "../../assets/green_points.svg";
import { ReactComponent as MultiboxMarkerIcon } from "../../assets/multibox.svg";
import { ReactComponent as Close } from "../../assets/close-dark.svg";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      left: 0,
    },
  },
};

const names: CollectionCategory[] = [
  CollectionCategory.GreenPoint,
  CollectionCategory.Multibox,
  CollectionCategory.Plastic,
  CollectionCategory.Cloth,
  CollectionCategory.Paper,
  CollectionCategory.Glass,
  CollectionCategory.Electronic,
  CollectionCategory.Battery,
];

export default function MultipleSelectChip() {
  const [categories, setCategories] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof categories>) => {
    const {
      target: { value },
    } = event;
    setCategories(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  const renderMarker = (type: CollectionCategory) => {
    switch (type) {
      case CollectionCategory.Paper:
        return <PaperMarkerIcon />;
      case CollectionCategory.Plastic:
        return <PlasticMarkerIcon />;
      case CollectionCategory.Electronic:
        return <ElectronicDevicesMarkerIcon />;
      case CollectionCategory.Cloth:
        return <ClothMarkerIcon />;
      case CollectionCategory.Multibox:
        return <MultiboxMarkerIcon />;
      case CollectionCategory.Glass:
        return <GlassMarkerIcon />;
      case CollectionCategory.GreenPoint:
        return <GreenPointsMarkerIcon />;
      case CollectionCategory.Battery:
        return <BatteriesMarkerIcon />;
    }
  };

  return (
    <div className={""}>
      <FormControl className={"w-full "}>
        {categories.length > 0 && (
          <div
            className={
              "absolute right-[24px] z-10 top-1/2 -translate-y-1/2 w-[32px] h-[32px] flex justify-center items-center"
            }
          >
            <Close
              onClick={() => {
                setCategories([]);
              }}
            />
          </div>
        )}

        <InputLabel id="demo-multiple-chip-label">Select your box</InputLabel>
        <Select
          className={"bg-white w-full"}
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={categories}
          onChange={handleChange}
          input={
            <OutlinedInput id="select-multiple-chip" label="Select your box" />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => {
                return (
                  <div key={value} className={"flex"}>
                    {renderMarker(value as CollectionCategory)}
                    <Chip key={value} label={value} />
                  </div>
                );
              })}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              {renderMarker(name)}
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
