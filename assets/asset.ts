import type { StaticImageData } from "next/image";

/** Single image item — can be local StaticImageData or remote URL string */
export type GalleryItem = {
  id: number,
  image: StaticImageData | string,
};

/** Year group wrapper */
export type GalleryYearGroup = {
  year: string,
  items: GalleryItem[],
};

/* ---- Local image imports ---- */
import our_mission from "./our_mission.png";
import our_vision from "./our_vision.png";
import our_values from "./our_values.png";
import portb_location from "./portb_location.png";
import portb_logo from "./portb_logo.png";
import b_logo from "./b_logo.png";
import bni_logo from "./bni_logo.png";
import boehringer_ingelheim_logo from "./boehringer_ingelheim_logo.png";
import canon_logo from "./canon_logo.png";
import khr_logo from "./khr_logo.png";
import medisavers_logo from "./medisavers_logo.png";
import petron_logo from "./petron_logo.png";
import petronas_logo from "./petronas_logo.png";
import prudential_logo from "./prudential_logo.png";
import redwheels_logo from "./redwheels_logo.png";
import samurai_logo from "./samurai_logo.png";
import shell_logo from "./shell_logo.png";
import sme_logo from "./sme_logo.png";
import vci_logo from "./vci_logo.png";
import bg_cta_home from "./bg_cta_home.png";
import meeting_room from "./meeting_room.png";
import green_area from "./green_area.png";
import fixed_desk from "./fixed_desk.png";
import common_area from "./common_area.png";
import event_space_area from "./event_space_area.png";
import meeting_pitch from "./meeting_pitch.png";
import codekids from "./codekids.png";
import digital_event from "./digital_event.png";
import recruit from "./recruit.png";
import featured_event_1 from "./featured_event_1.png";
import featured_event_2 from "./featured_event_2.png";
import coffee_session from "./coffee_session.png";
import night_pitch from "./night_pitch.png";
import event_session from "./event_session.png";
import workshop_session from "./workshop_session.png";
import coffee_machine from "./coffee_machine.png";
import fixed_desk_guests from "./fixed_desk_guests.png";
import common_area_light from "./common_area_light.png";
import common_area_guests from "./common_area_guests.png";
import green_area_guests from "./green_area_guests.png";
import pizza from "./pizza.png";
import birthday_event from "./birthday_event.png";
import sogno_cafe from "./sogno_cafe.png";
import sogno_environment from "./sogno_environment.png";
import sogno_menu from "./sogno_menu.png";
import sogno_logo from "./sogno_logo.png";
import sogno_signature from "./sogno_signature.png";
import feedback_thumbnail_1 from "./feedback_thumbnail_1.png";
import feedback_thumbnail_2 from "./feedback_thumbnail_2.png";
import feedback_thumbnail_3 from "./feedback_thumbnail_3.png";
import feedback_thumbnail_4 from "./feedback_thumbnail_4.png";
import july_lai from "./july_lai.png";
import profile_july_lai from "./profile_july_lai.png";
import yoga_video_thumbnail_1 from "./yoga_video_thumbnail_1.png";
import portb_yoga_1 from "./portb_yoga_1.png";
import portb_yoga_2 from "./portb_yoga_2.png";
import portb_yoga_3 from "./portb_yoga_3.png";
import portb_yoga_4 from "./portb_yoga_4.png";
import portb_yoga_5 from "./portb_yoga_5.png";
import portb_yoga_6 from "./portb_yoga_6.png";
import portb_yoga_7 from "./portb_yoga_7.png";
import yoga_benefit_1 from "./yoga_benefit_1.png";
import yoga_benefit_2 from "./yoga_benefit_2.png";
import yoga_benefit_3 from "./yoga_benefit_3.png";
import cta_portb_bg from "./cta_portb_bg.png";
import meeting_room_v2 from "./meeting_room_v2.png";
import event_space_v2 from "./event_space_v2.png";
import event_space_training from "./event_space_training.png";
import amenities_wifi from "./amenities_wifi.png";
import amenities_coffee from "./amenities_coffee.png";
import amenities_surau_tandas from "./amenities_surau_tandas.png";
import amenities_display from "./amenities_display.png";
import amenities_admin from "./amenities_admin.png";
import amenities_prime_location from "./amenities_prime_location.png";
import amenities_cctv from "./amenities_cctv.png";
import program_curious_club from "./program_curious_club.png";
import program_herhour from "./program_herhour.png";
import testimony_thumbnail from "./testimony_thumbnail.png";
import program_chapters from "./program_chapters.png";
import profile_amirah from "./profile_amirah.png";
import profile_ariff from "./profile_ariff.png";
import profile_thaqif from "./profile_thaqif.png";
import profile_maji from "./profile_maji.png";
import profile_carl from "./profile_carl.png";
import hero_1 from "./hero_1.png";
import hero_2 from "./hero_2.png";
import hero_3 from "./hero_3.png";
import hero_4 from "./hero_4.png";
import hero_5 from "./hero_5.png";
import mission_vision from "./mission_vision.png";
import sandwich from "./sandwich.png";
import nasi_ayam from "./nasi_ayam.png";
import daging_kerutuk from "./daging_kerutuk.png";
import artisan_dessert from "./artisan_dessert.png";
import biryani from "./biryani.png";
import bihoon from "./bihoon.png";
import cta_yoga_bg from "./cta_yoga_bg.png";
import private_locker from "./private_locker.png";
import mail_management from "./mail_management.png";
import prestigious_address from "./prestigious_address.png";
import security_cctv from "./security_cctv.png";


/* ---- Other assets ---- */
export const assets = {
  our_mission,
  our_vision,
  our_values,
  portb_location,
  portb_logo,
  b_logo,
  bni_logo,
  boehringer_ingelheim_logo,
  canon_logo,
  khr_logo,
  medisavers_logo,
  petron_logo,
  petronas_logo,
  prudential_logo,
  redwheels_logo,
  samurai_logo,
  shell_logo,
  sme_logo,
  vci_logo,
  bg_cta_home,
  meeting_room,
  green_area,
  fixed_desk,
  common_area,
  event_space_area,
  meeting_pitch,
  codekids,
  digital_event,
  recruit,
  featured_event_1,
  featured_event_2,
  coffee_session,
  night_pitch,
  event_session,
  workshop_session,
  coffee_machine,
  fixed_desk_guests,
  common_area_light,
  common_area_guests,
  green_area_guests,
  pizza,
  birthday_event,
  sogno_cafe,
  sogno_menu,
  sogno_environment,
  sogno_logo,
  sogno_signature,
  feedback_thumbnail_1,
  feedback_thumbnail_2,
  feedback_thumbnail_3,
  feedback_thumbnail_4,
  july_lai,
  profile_july_lai,
  portb_yoga_1,
  portb_yoga_2,
  portb_yoga_3,
  portb_yoga_4,
  portb_yoga_5,
  portb_yoga_6,
  portb_yoga_7,
  yoga_video_thumbnail_1,
  yoga_benefit_1,
  yoga_benefit_2,
  yoga_benefit_3,
  cta_portb_bg,
  meeting_room_v2,
  event_space_v2,
  event_space_training,
  amenities_wifi,
  amenities_coffee,
  amenities_surau_tandas,
  amenities_display,
  amenities_admin,
  amenities_prime_location,
  amenities_cctv,
  program_curious_club,
  program_herhour,
  testimony_thumbnail,
  program_chapters,
  profile_amirah,
  profile_ariff,
  profile_thaqif,
  profile_maji,
  profile_carl,
  hero_1,
  hero_2,
  hero_3,
  hero_4,
  hero_5,
  mission_vision,
  sandwich,
  nasi_ayam,
  daging_kerutuk,
  artisan_dessert,
  biryani,
  bihoon,
  cta_yoga_bg,
  private_locker,
  mail_management,
  prestigious_address,
  security_cctv

};


