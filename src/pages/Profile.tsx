import tw, { styled } from 'twin.macro';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from "../store/auth/auth.selectors";

import img1 from '../assets/images/sample/sample_avatar2.png';
import { Divider, Select, Input } from 'antd';
import ImageUploader from 'react-images-upload';
import { userService } from '../services';
import { updateUser } from '../store/auth/auth.actions';

const StyledPage = styled.div`
  ${tw`w-full`}
  height: calc(100vh - 110px);
  background: #FFFFFF !important;
`;

const Profile = () => {
  
  const dispatch = useDispatch();
  const formData = new FormData();
  const { TextArea } = Input;

  const user = useSelector(selectUser);

  const [name, setName]  = useState<string>('');
  const [bio, setBio]  = useState<string>('');
  const [newImage, setPictureFiles]  = useState<string>('');
  
  useEffect(() => {
    setPictureFiles(user.avatar);
  }, [user]);

  const onDrop = async(pictureFiles: File[], pictureDataURLs: string[]) => {
    const selectedFile = pictureFiles[0];
    pictureFiles = [];
    formData.append(
      "images",
      selectedFile,
      selectedFile.name
    );
    const res = await userService.imageUpload({images: formData});
    setPictureFiles(res?.data?.files[0]);
  }

  const onProfileUpdate = () => {
    const newUser = {
      _id: user._id,
      name: name?name:user.name,
      avatar: newImage,
      bio: bio?bio:user.bio,
      account: user.account,
      created: user.created
    }
    dispatch(updateUser(user.account, newUser));
  }

  const onChangeName = (e: any) => {
    setName(e.target.value)
  }

  const onChangeBio = (e: any) => {
    setBio(e.target.value)
  }

  return (
    <StyledPage>
      <div tw="mx-auto max-w-6xl px-3 pt-14 pb-32">
        <div tw="text-3xl text-gray-300 font-bold">Edit profile</div>
        <div tw="grid grid-cols-2 gap-10">
          <div tw="mt-12">
            <div>
              <div tw="text-base font-semibold text-gray-300 mb-2">Display name</div>
              <Input type="text" defaultValue={user.name} onChange={onChangeName}/>
            </div>
            <div tw="mt-6">
              <div tw="text-base font-semibold text-gray-300 mb-2">Bio</div>
              <TextArea rows={4} defaultValue={user?.bio} onChange={onChangeBio}/>
            </div>
            <div tw="mt-6">
              <div tw="text-base font-semibold text-gray-300 mb-2">Email address</div>
              <Input type="text" />
            </div>
            <div tw="mt-6">
              <div tw="text-base font-semibold text-gray-300 mb-2">Twitter</div>
              <div tw="grid grid-cols-5 gap-2">
                <Input tw="col-span-4" type="text" />
                <button tw="col-span-1 bg-white text-violet-200 text-[13px] font-semibold px-6 py-1 rounded border border-solid border-violet-200  hover:border-violet-100">
                  Link
                </button>
              </div>
            </div>
            <button onClick={onProfileUpdate} tw="bg-[#9C40CF] text-white text-base font-semibold px-12 py-2 mt-10 rounded border border-transparent hover:border-white">
              Save change
            </button>
          </div>
          <div tw="px-10">
            <div tw="text-base font-semibold text-gray-300 mb-2 mt-12">Display name</div>
            <img alt="metamask" src={newImage} tw="w-32 h-32 rounded-full mt-5"/>
            <div tw="text-xs text-gray-800 mt-6">Recommended an image of at<br></br> least 350 x 350. Max size: 50mb</div>
            <ImageUploader
              withLabel={false}
              withIcon={false}
              buttonStyles={{
                background:'white',
                color: '#522294',
                fontWeight: "600",
                border: 'solid 1px #522294',
                borderRadius: '6px',
                fontSize: '13px'
              }}
              labelStyles={{
                border: 'unset',
                boxShadow: 'unset'
              }}
              buttonText='Choose file'
              onChange={onDrop}
              imgExtension={['.jpg', '.gif', '.png', '.gif']}
              maxFileSize={5242880}
            />
          </div>
        </div>
      
      </div>
    </StyledPage>
  );
};

export default Profile;
