'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Registrations',
      [
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'eeaken0',
          discord_id: '8683e4fa-ae9a-4d45-89ed-9787b53d043a',
          discord_rank_role_id: '49116e5f-75cd-408a-86ec-c16d39a2136b',
          discord_rank_role_name: 'Bronz',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'mbenstead1',
          discord_id: '65b55901-f1bf-40a6-ae6a-b75d86c1fd82',
          discord_rank_role_id: 'c45b4db9-4db9-4c99-92d4-8383489b6bd4',
          discord_rank_role_name: 'Champion',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'kmcquade2',
          discord_id: 'c43af84b-befe-4a6b-8a95-373c4e80b1a2',
          discord_rank_role_id: '4a36306f-38f4-4bfe-88e8-487cbbf7c784',
          discord_rank_role_name: 'Silver',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'luphill3',
          discord_id: '88cf9d93-c457-4d23-93c7-4d2bee3acbf3',
          discord_rank_role_id: '85a7af2b-687d-4211-bcab-56119e744079',
          discord_rank_role_name: 'Champion',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'blyal4',
          discord_id: '80a80952-2ee9-4f95-ae4f-39115a66e6ce',
          discord_rank_role_id: 'd0ac13b6-1912-4b84-8b73-e48cb958eea8',
          discord_rank_role_name: 'Platinum',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'lsherborn5',
          discord_id: 'fe9b4ef6-f2a3-4df1-98a2-84c948788f1d',
          discord_rank_role_id: '84422fca-0dca-495f-8bbc-0dd5708297a6',
          discord_rank_role_name: 'Diamond',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'rgilfether6',
          discord_id: 'edf06554-1f34-42a9-aebd-b97321834c64',
          discord_rank_role_id: '50b2395f-befa-4872-aa03-96fa90a0a7f4',
          discord_rank_role_name: 'Champion',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'fwiersma7',
          discord_id: '21957977-9207-4585-941d-aa04b34bf9f3',
          discord_rank_role_id: 'fa23bfe0-c975-4e81-bf82-9e1291d3e75a',
          discord_rank_role_name: 'Bronz',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'nsavage8',
          discord_id: '1e4ee2ab-3521-4da5-a8e1-bca75d42cb58',
          discord_rank_role_id: '7a81095e-5202-4e33-bb77-20dccf85dd06',
          discord_rank_role_name: 'Grand Champion',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'jpavlik9',
          discord_id: '06c4c52a-f268-44bc-a7c6-acd26aaf3ec4',
          discord_rank_role_id: '87fe729c-e804-40a7-9e36-c5758740ce61',
          discord_rank_role_name: 'Bronz',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'wbullocka',
          discord_id: '084d1133-ba2b-4f54-b5ea-f08b1b9eca7e',
          discord_rank_role_id: '04ada210-b455-4787-8516-d49512f0a714',
          discord_rank_role_name: 'Champion',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'afirbanksb',
          discord_id: '462bbb34-2692-4957-bca1-4ab4032b5a8e',
          discord_rank_role_id: 'bcbe95d4-f96e-4ce5-9f20-21a3fd27b43b',
          discord_rank_role_name: 'Bronz',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'bworsnopc',
          discord_id: '88e0df02-1a96-4e0c-95e1-89627a5181be',
          discord_rank_role_id: '762b2551-d816-47c1-bca5-5626454e96b0',
          discord_rank_role_name: 'Silver',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'phanshawd',
          discord_id: '64363746-14e5-4610-ac4c-032cb5ffb9b8',
          discord_rank_role_id: '7cbfe31d-081e-475f-b104-ef5c639a4ec9',
          discord_rank_role_name: 'Diamond',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'aeadse',
          discord_id: '3c1f5052-9e45-4036-b880-53f381e35d72',
          discord_rank_role_id: 'c99527b6-c704-4ca4-b569-fe1dd2c1899e',
          discord_rank_role_name: 'Platinum',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'sbratcherf',
          discord_id: '75e5bb89-5379-4a56-b916-16b6b8f9c4cc',
          discord_rank_role_id: '67074cc3-99e5-407e-a4ee-b371637d5914',
          discord_rank_role_name: 'Gold',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'nferencg',
          discord_id: '02743987-7eeb-43d0-ab4c-cc53d802879c',
          discord_rank_role_id: 'f35deeed-8894-4c53-aa67-c75d15caf85c',
          discord_rank_role_name: 'Diamond',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'lhebblewaiteh',
          discord_id: 'c1ba7052-cf8d-44ff-a746-80b0b9c9b420',
          discord_rank_role_id: '54943065-7c53-463d-a848-75ac01fc3838',
          discord_rank_role_name: 'Bronz',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'hwinkelli',
          discord_id: '49881441-e13c-4caa-ae27-ec6022ed6343',
          discord_rank_role_id: '6ee5e4af-e1c6-4cd5-9177-50e1257e5608',
          discord_rank_role_name: 'Bronz',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'jroglieroj',
          discord_id: '2f64a4da-66e8-4460-bd37-3407f9153925',
          discord_rank_role_id: 'e413d7be-ff86-42d2-b9d4-9e4a7269c46f',
          discord_rank_role_name: 'Champion',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'isaggk',
          discord_id: '970f1c94-8af1-452c-8dc0-8052a0214d77',
          discord_rank_role_id: '1b864efc-2533-48cf-9e3b-6d2e9099a00a',
          discord_rank_role_name: 'Diamond',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'kgeorgell',
          discord_id: 'e22ea7ff-9109-403b-8a4c-dc96adc46ebe',
          discord_rank_role_id: 'a245c3eb-ee61-4995-9114-deb147777397',
          discord_rank_role_name: 'Bronz',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'cskocroftm',
          discord_id: '0edf3e1b-51e1-40ef-a59c-b6e898ba0201',
          discord_rank_role_id: '1e6929d0-09de-4e5f-a2c5-6ae9d7fdf95c',
          discord_rank_role_name: 'Champion',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'cscrivinern',
          discord_id: '7aff9f91-68c1-4399-b48d-5a80cf60463e',
          discord_rank_role_id: 'b032edf1-0ea5-416a-8e94-4ab02939dacf',
          discord_rank_role_name: 'Silver',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'rmarcuso',
          discord_id: '0a876088-1dce-434b-a120-ae1a81c6f785',
          discord_rank_role_id: '6d5b34d6-d818-492a-bab4-f6a62aaf88be',
          discord_rank_role_name: 'Grand Champion',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'mbrasherp',
          discord_id: 'fe4e6171-ba98-4b88-923d-03457d5beb1f',
          discord_rank_role_id: '7b6bbcbe-649d-4152-90c6-215000e18249',
          discord_rank_role_name: 'Silver',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'jgingelq',
          discord_id: '04397d5f-e863-4403-8599-de65f18be3db',
          discord_rank_role_id: '697a32b7-268f-41bd-a4b7-da3d7fb187ab',
          discord_rank_role_name: 'Platinum',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'astubbinsr',
          discord_id: '6d2dc3aa-0291-4226-afbe-a93f1789f497',
          discord_rank_role_id: '579c2a27-a28b-4f7d-8931-0d946f19ca0f',
          discord_rank_role_name: 'Diamond',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'spelfers',
          discord_id: '901a53d4-6c75-4d0a-9b90-049e163027a8',
          discord_rank_role_id: '994e6073-60c7-4d93-9b05-e5c7aa4fee47',
          discord_rank_role_name: 'Bronz',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'dollettt',
          discord_id: '2b98f81d-9966-41b3-b0e3-444f6aa55f6d',
          discord_rank_role_id: '24709591-9707-4e71-a931-dc2fbe3a091d',
          discord_rank_role_name: 'Champion',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'ahanselmannu',
          discord_id: '662ba2a0-f2b0-4d00-9c42-cdffe4a57346',
          discord_rank_role_id: 'e6efab3b-c7b2-434d-b2d4-cc3ca46f7bd8',
          discord_rank_role_name: 'Silver',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'bdebruijnev',
          discord_id: '22e1a42a-0ea7-43e8-aebe-0a297f5d3c43',
          discord_rank_role_id: '97b1c5c2-e1af-4716-a038-ab1a51ef5d64',
          discord_rank_role_name: 'Diamond',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'emasselinw',
          discord_id: 'd859eeff-db9f-484a-8eb1-4ca301358432',
          discord_rank_role_id: 'b7887f03-dbe1-4bc3-9d85-8834e660f338',
          discord_rank_role_name: 'Gold',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'mseawardx',
          discord_id: '7298bf6a-9d52-4379-be6b-b7d97c3add2a',
          discord_rank_role_id: 'eecd7c76-6430-4e08-b2e9-888d565b58f1',
          discord_rank_role_name: 'Champion',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'elangtryy',
          discord_id: '62dfc3d7-b89b-490d-8b0f-589b4aad8725',
          discord_rank_role_id: '3e618bad-81d7-40b1-94e3-2463c2cc918e',
          discord_rank_role_name: 'Champion',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'dcollatonz',
          discord_id: 'eb55e50b-84df-4c25-af0d-3ff366833e63',
          discord_rank_role_id: 'c566259f-be65-416f-aad1-eaf62d62148e',
          discord_rank_role_name: 'Diamond',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'sbroadist10',
          discord_id: '68fba9bc-3c4d-4181-a206-bad05af7ddc2',
          discord_rank_role_id: '4d48e1c1-c320-41fa-930a-317775a1bd58',
          discord_rank_role_name: 'Grand Champion',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'amuncie11',
          discord_id: '38e9421a-644d-45a0-b679-256d6b61380f',
          discord_rank_role_id: '8c016c8b-de3e-4d03-85a4-1b56a8d09857',
          discord_rank_role_name: 'Silver',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'twillford12',
          discord_id: '58996d5e-9d4c-49e2-ab21-7b638684c27a',
          discord_rank_role_id: '6ba23cc2-4dd4-4959-85b8-dd3d0a31a9ee',
          discord_rank_role_name: 'Silver',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'hvedyaev13',
          discord_id: '3122f5d2-57ca-4f93-a4ea-cf18a74dde63',
          discord_rank_role_id: 'b49f1c6b-b28c-41ef-b8ac-d0ab1d09205d',
          discord_rank_role_name: 'Champion',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'sdeeves14',
          discord_id: 'ec31b192-4f79-4338-8a10-8b2d88f4e7b9',
          discord_rank_role_id: '3916e601-bbb2-4a3e-830e-4e2516a0e088',
          discord_rank_role_name: 'Diamond',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'rallard15',
          discord_id: 'c2d095d4-8475-4d47-a7fb-8b9598a87f32',
          discord_rank_role_id: '731519cd-5ed8-4a7d-9128-58c1317e59ca',
          discord_rank_role_name: 'Champion',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'jpound16',
          discord_id: '3df07890-5202-4185-92e2-58c6123948de',
          discord_rank_role_id: '1b178805-baa0-42fd-8b2f-c19728938057',
          discord_rank_role_name: 'Platinum',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'lgeddis17',
          discord_id: '660e5f4c-a43c-42c8-b0fd-a91a441e592f',
          discord_rank_role_id: '8805175e-7387-4e4f-8258-6e419764ef9e',
          discord_rank_role_name: 'Grand Champion',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'hstpaul18',
          discord_id: 'd0f5198c-718d-4550-9240-b2e36b75fcf0',
          discord_rank_role_id: '040bffcd-fa90-4376-ace8-1909d76b6927',
          discord_rank_role_name: 'Platinum',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'spiatto19',
          discord_id: 'ffe22c59-d4ec-4193-8c33-82532c37efff',
          discord_rank_role_id: '758b5261-162d-4be1-a644-f702b169c84c',
          discord_rank_role_name: 'Grand Champion',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'gbramley1a',
          discord_id: '68fe6deb-fc12-4807-a486-ed8007abcefb',
          discord_rank_role_id: '1da17b3a-5320-4ccb-8739-6fbae53dad16',
          discord_rank_role_name: 'Diamond',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'lthurnham1b',
          discord_id: '1692e4b9-7e4f-4352-a301-b4679b364f12',
          discord_rank_role_id: 'fb32d6ef-cb15-431b-8a5f-cacf7a2ef21e',
          discord_rank_role_name: 'Champion',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'rbountiff1c',
          discord_id: '7932cc6c-ba02-4500-b179-32057ed083c0',
          discord_rank_role_id: 'a7eadcfe-af6b-4912-8967-ae82a5685d0d',
          discord_rank_role_name: 'Grand Champion',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'rparzizek1d',
          discord_id: 'c7c00bd7-bf42-4fb3-8e08-734a382e12ba',
          discord_rank_role_id: 'ce613392-db56-4e4e-93e7-df0e058ae7a5',
          discord_rank_role_name: 'Champion',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'aternott1e',
          discord_id: '4b35397b-539f-49ac-a2ec-27ad858d8d1a',
          discord_rank_role_id: '293d5330-2606-4e39-80da-793b4d7b0f9f',
          discord_rank_role_name: 'Silver',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'gridgley1f',
          discord_id: '63dc339f-8150-43d0-b349-de4574aeb7b4',
          discord_rank_role_id: '53ec64eb-e5b7-4731-9d65-480281dc41dc',
          discord_rank_role_name: 'Platinum',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'lmuino1g',
          discord_id: '847cd1ad-9588-49fd-9174-509371676ab5',
          discord_rank_role_id: 'b92a17e0-dda1-4205-8939-f3d0eaa1efd4',
          discord_rank_role_name: 'Grand Champion',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'gfinlator1h',
          discord_id: '09a7fb2a-5c23-458f-a9d2-56a519cdcdc7',
          discord_rank_role_id: 'ea3395d1-d867-4ea2-97b2-388356e843fd',
          discord_rank_role_name: 'Diamond',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'cwormald1i',
          discord_id: 'a32f219e-2a1f-4d66-9908-2b45d6c81c5e',
          discord_rank_role_id: '4fcc93fb-b7e6-4c34-972e-3fae984377b6',
          discord_rank_role_name: 'Gold',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'ahelsby1j',
          discord_id: '7ef54c8c-6d47-4b53-b559-5254401e3ae6',
          discord_rank_role_id: '1f660ebf-2fb0-467f-8157-667183f710dc',
          discord_rank_role_name: 'Platinum',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'ewaldock1k',
          discord_id: 'e4c07abe-96ab-4c13-944b-5fd753b79140',
          discord_rank_role_id: 'e5a08d34-8320-4212-8a29-021b4b64d0ec',
          discord_rank_role_name: 'Platinum',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'rmacconaghy1l',
          discord_id: '6050b9a8-c490-4212-b1c6-57186dc22b80',
          discord_rank_role_id: 'a9ebd6d9-76b9-4196-9c53-0587f1e62eee',
          discord_rank_role_name: 'Diamond',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'hskillicorn1m',
          discord_id: 'c12fe4a0-f3e6-4b34-8dfb-1dc92aab8925',
          discord_rank_role_id: 'bf11b190-4fd5-4c86-804a-80945a0d28fc',
          discord_rank_role_name: 'Bronz',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'abroadstock1n',
          discord_id: '095c3ee0-849f-4569-87de-3708e552ec05',
          discord_rank_role_id: '36f453a4-6ab4-4037-822a-9dcafe25ce7b',
          discord_rank_role_name: 'Platinum',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'aashborne1o',
          discord_id: 'e735c701-b69d-43b5-a850-d2dd2746073f',
          discord_rank_role_id: '633e777c-88ec-4dd6-9d2e-b03c72a24649',
          discord_rank_role_name: 'Silver',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'jwimbridge1p',
          discord_id: 'bb8fa6d2-865a-4590-a750-4f900001280e',
          discord_rank_role_id: '4e255eee-40f3-4224-9983-1a556194b893',
          discord_rank_role_name: 'Platinum',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'ewarcop1q',
          discord_id: 'be93d57d-7e49-4302-a8ed-1e303570ac91',
          discord_rank_role_id: 'd6d34ee1-7039-4154-aa57-e253c536f5ca',
          discord_rank_role_name: 'Grand Champion',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'tgillise1r',
          discord_id: '15521ec8-943f-40ce-b2d1-7d3257321d2a',
          discord_rank_role_id: '73311c59-0504-44f6-9bb2-0f302ab0b465',
          discord_rank_role_name: 'Diamond',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'ghaselup1s',
          discord_id: '27fb08c4-3045-4108-873b-6c5f2fcfcebe',
          discord_rank_role_id: '98c16f31-cf30-4825-95b4-e3aeef6379ab',
          discord_rank_role_name: 'Champion',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'nstrahan1t',
          discord_id: '7b8918cf-317e-40fe-adfc-696d80a7bb62',
          discord_rank_role_id: '2c56e94f-3c3d-40f9-8455-21f78fa9780e',
          discord_rank_role_name: 'Platinum',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'bgilchrest1u',
          discord_id: '02ab753c-1290-4aa7-b99c-80d35497eb9a',
          discord_rank_role_id: 'da32e808-7c42-4077-a24e-2080751a41a0',
          discord_rank_role_name: 'Champion',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'vseint1v',
          discord_id: 'ab632208-a438-4d2e-90e9-fb26adcbea8b',
          discord_rank_role_id: 'ab567811-45a5-411a-9e58-326e78e60810',
          discord_rank_role_name: 'Platinum',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'cwhyman1w',
          discord_id: 'aa2a5b23-6caf-406d-9b50-d553e867cc81',
          discord_rank_role_id: '21f0ebdf-f258-49cc-9557-c9a1d32a3202',
          discord_rank_role_name: 'Silver',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'rsteadman1x',
          discord_id: '41625e9b-ed03-40b4-9ae5-76ada5a5120a',
          discord_rank_role_id: '8ca8a29d-20d8-44d3-b72e-679b4a25bbb9',
          discord_rank_role_name: 'Champion',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'achaudrelle1y',
          discord_id: '41ab5b1c-f4f3-4be7-881e-f5d939dda338',
          discord_rank_role_id: '68197623-45fa-4b59-9faf-5b11bb1122b2',
          discord_rank_role_name: 'Champion',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'bhatwells1z',
          discord_id: '77314aed-9498-401b-ae9e-213480c78431',
          discord_rank_role_id: '5d80c14b-9e99-4383-8646-396d39c224d9',
          discord_rank_role_name: 'Diamond',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'ddefreitas20',
          discord_id: 'e64ac62c-1fc5-447a-8956-33fe2d50d13e',
          discord_rank_role_id: '0d9eb35a-f0ae-4643-8d5a-0ebc50c627cc',
          discord_rank_role_name: 'Champion',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'efolder21',
          discord_id: '0c8361b0-b002-44bd-834a-6a0a0e2d428c',
          discord_rank_role_id: 'c233752c-2fb0-4051-92cb-eaa11e6ea3aa',
          discord_rank_role_name: 'Diamond',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'dlonnon22',
          discord_id: 'c292a1df-cd42-4028-b13a-194a60614f48',
          discord_rank_role_id: 'ce96a3bb-0575-4467-abf9-f9f3ec83aa2c',
          discord_rank_role_name: 'Gold',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'jhedingham23',
          discord_id: '16ac537c-95f8-42fa-917f-7966b3be2144',
          discord_rank_role_id: 'f0d8e7bd-d62a-47f2-9869-e11fe03ad30c',
          discord_rank_role_name: 'Grand Champion',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'adooher24',
          discord_id: '864664a5-a8c5-4892-908f-cba10e493812',
          discord_rank_role_id: 'b8dea8c2-0b88-4997-860d-ee73a4221cef',
          discord_rank_role_name: 'Diamond',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'ktocknell25',
          discord_id: 'c5baa2de-d4cb-4ed6-bf8c-f985c174b6b6',
          discord_rank_role_id: '1e0c9010-2185-46d0-af9e-49bcec4fe785',
          discord_rank_role_name: 'Champion',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'mreffe26',
          discord_id: '94fe4fd1-ad67-4693-8f11-9c8e702e9953',
          discord_rank_role_id: '82d5f3de-0fdc-490f-98e3-b8fe11ea2096',
          discord_rank_role_name: 'Gold',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'gpury27',
          discord_id: '04d8b4d7-fb72-4232-87e0-db6a5b8708d3',
          discord_rank_role_id: '879cbe3f-cc9c-4b60-a80c-37c551c19eed',
          discord_rank_role_name: 'Silver',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'derbain28',
          discord_id: 'cdf5e933-9549-4486-9d1f-643c62d557ce',
          discord_rank_role_id: '9a9bae42-e8be-40ad-94ef-66f340d52063',
          discord_rank_role_name: 'Grand Champion',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'jcranham29',
          discord_id: '65526bfa-145e-444f-a71e-89335213dd00',
          discord_rank_role_id: '3f3ba56c-3817-4943-8456-ce756cd641c7',
          discord_rank_role_name: 'Gold',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          tournament_id: 5,
          username: 'nlively2a',
          discord_id: 'ac05fb36-f12d-479e-a6ff-2a95965f5aa8',
          discord_rank_role_id: '5dfcb7b6-4f2c-488f-9838-57ea1cf7be35',
          discord_rank_role_name: 'Champion',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Registrations', null, {});
  },
};
