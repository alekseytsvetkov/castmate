import React from 'react';
import { FC } from 'react';
import styled from 'styled-components';
import { Input, Submit } from '@castmate/ui';
import { Logo } from '../Logo';
import Tabs, { TabPane } from 'rc-tabs';
import { Youtube } from 'react-feather';
import { Formik, Form } from 'formik';
import {
  useCreateRoomMutation,
  useCreateRoomMediaMutation
} from '@castmate/room';
import { matchYoutubeUrl } from '@castmate/utils/matchYoutubeUrl';
import { useRouter } from 'next/router';

const NewRoomBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;
  max-width: 500px;
  width: 500px;
`;

const NewRoomTitle = styled.div`
  display: flex;
  font-size: 15px;
  padding: 20px 0;
  color: ${({ theme }) => theme.colors.text1};
`;

const NewRoomDescription = styled.div`
  display: flex;
  font-size: 15px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.accent2};
`;

const LogoBox = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Error = styled.div`
  margin-top: 20px;
  color: ${({ theme }) => theme.colors.red};
`;

export type IVersionProps = {
  onClose: () => void;
};

const callback = function(key) {};

export const NewRoom: FC<IVersionProps> = () => {
  const router = useRouter();
  const [createRoomMutation, { data, loading, error }] = useCreateRoomMutation();
  const [createRoomMediaMutation, { data: dataRoomMedia, loading: loadingRoomMedia, error: errorRoomMedia }] = useCreateRoomMediaMutation();



  return <NewRoomBox>
    <LogoBox>
      <Logo />
    </LogoBox>
    <NewRoomTitle>Create room</NewRoomTitle>
    <NewRoomDescription>This is an early version of the Castmate site which is available for demonstration purposes.</NewRoomDescription>
    <Tabs
      defaultActiveKey="1"
      onChange={callback}
      animated={
        {inkBar: false}
      }
    >
      <TabPane tab="Youtube" key="1">
        <Formik
          initialValues={{ mediaLink: "" }}
          onSubmit={async (values, { setErrors }) => {
            const match = matchYoutubeUrl(values.mediaLink);
            if(!match) {
              setErrors({mediaLink:'Incorrect URL'})
              return null;
            } else {
              const roomMedia = await createRoomMediaMutation({
                variables: {
                  input: {
                    link: values.mediaLink
                  }
                }
              })

              console.log('roomMedia', roomMedia)

              if (roomMedia.data) {
                const response = await createRoomMutation({
                  variables: {
                    input: {
                      roomMediaId: roomMedia.data.createRoomMedia.id
                    }
                  }
                });
                if (response.data?.createRoom) {
                  router.push(`room/${response.data?.createRoom.id}`);
                }
              }
            }
          }}
          >
          {({
            values,
            handleChange,
            handleBlur,
            errors,
            isSubmitting
          }) => (
            <Form>
              <Input
                name="mediaLink"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.mediaLink}
                isFirst={false}
                isFull
                placeholder="Paste YouTube link here"
                mainColor="accent1"
                icon={<Youtube size={20} color="#8a919d" />}
                required
              />
              {errors.mediaLink ? <Error>{errors.mediaLink}</Error> : ""}
              <Submit disabled={values.mediaLink.length < 20}>
                {!isSubmitting ? 'Create' : 'Loading'}
              </Submit>
            </Form>
          )}
        </Formik>
      </TabPane>
      <TabPane tab="TikTok (soon)" key="2" disabled>
        TikTok (soon)
      </TabPane>
      <TabPane tab="Movie (soon)" key="3" disabled>
        Movie (soon)
      </TabPane>
    </Tabs>
  </NewRoomBox>
};

export default NewRoom;
