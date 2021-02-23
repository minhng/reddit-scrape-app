import React, { useState, useMemo } from 'react'
import { Formik, Form } from 'formik'
import { Button, ButtonGroup, Flex, Box } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { MyInput } from '../components/MyInput';
import axios from 'axios';
import * as Yup from 'yup';
import { MyTable } from '../components/MyTable';

interface mainProps { }

const NameSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
});

const Index: React.FC<mainProps> = ({ }) => {
  const [hottest, setHottest] = useState([])
  const [newest, setNewest] = useState([])
  const columns = useMemo(() => [
    {
      Header: "Title",
      accessor: "title"
    },
    {
      Header: "Comments Count",
      accessor: "num_comments"
    },
    {
      Header: "Reddit Score",
      accessor: "score"
    },
    {
      Header: "Url",
      accessor: "url",
    }
  ], [])
  const handleSubmit = async (value, { setErrors }) => {
    try {
      const response = await axios('http://redditscrapeflaskapp-env-1.eba-9xhckams.us-east-1.elasticbeanstalk.com/posts?subreddit_name=' + value.name);
      setHottest(response.data?.hottest);
      setNewest(response.data?.newest);
    } catch (e) {
      setErrors({ name: "Name not found" });
    }
  };
  const handleReset = () => {
    setHottest([]);
    setNewest([]);
  };
  return (
    <Flex flexDirection="column" minH="100vh" h="100%" justifyContent="space-between">
      <Wrapper variant='small'>
        <Formik
          initialValues={{ name: "" }}
          validationSchema={NameSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form>
              <MyInput
                name="name"
                placeholder="eg: python"
                label="Subreddit Name"
              />
              <ButtonGroup mt={4} flexDirection="row" justifyContent="center" d="flex" spacing="5">
                <Button
                  colorScheme="orange"
                  onClick={handleReset}
                >
                  Reset
                </Button>
                <Button
                  colorScheme="orange"
                  type="submit"
                >
                  Submit
                </Button>
              </ButtonGroup>
            </Form>
          )}
        </Formik>
      </Wrapper>
      <Wrapper>
        <MyTable title="Top 10 hottest posts" columns={columns} data={hottest}></MyTable>
        <MyTable title="Top 10 newest posts" columns={columns} data={newest}></MyTable>
      </Wrapper>
      <Box mt={20} mb={8} d="flex" justifyContent="center" w="100%"
        fontSize="xs" fontWeight="semibold" color="orange">
        Developed using React & Chakra UI. Deployed on AWS
      </Box>
    </Flex>
  );
}

export default Index