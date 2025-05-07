import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, User } from 'lucide-react';
import useMutation from '@/hooks/useMutation';
import useQuery from '@/hooks/useQuery';
import uploadFiles from '@/hooks/uploadFiles';
import { USERS_PROFILE } from '@/imports/api';
import { useNavigate } from 'react-router-dom';
// import {  UPDATE_USER } from '@/imports/api';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from '@/redux/features/user/userSlice';

function Profile() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
//   const { data: userData } = useQuery(ME);
  const { mutate: updateUser } = useMutation();
  // const userData={data:{
  //   firstName: 'Alex',
  //   lastName: 'Thompson',
  //   displayName: 'Alex Thompson',
  //   bio: 'Passionate about creating elegant solutions to complex problems. 5+ years of experience in web development.',
  //   location: 'San Francisco, CA',
  //   email: 'alex@example.com',
  //   github: 'github.com/alex',
  //   linkedin: 'linkedin.com/in/alex',
  //   twitter: '@alexdev',
  //   profilePicUrl: 'https://unsplash.com/photos/a-room-with-plants-shelf-and-a-framed-quote-tBWJpx89IrMhttps://images.unsplash.com/photo-1746240922260-efbea47dc532?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   templateId: '1',
  //   uniqueName: '',
  // }}
  const userData=useSelector(selectUser)

  const [formData, setFormData] = useState({
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    displayName: userData?.displayName || '',
    bio: userData?.bio || '',
    profilePicUrl: userData?.profilePicUrl || '',
    templateId: userData?.templateId || '1',
    uniqueName: userData?.uniqueName || '',
    linkedinUrl: userData?.linkedinUrl || '',
    twitterUrl: userData?.twitterUrl || '',
    facebookUrl: userData?.facebookUrl || '',
    address: userData?.address || '',
    
    
    
    
  });
  const uniqueNameOfUser=userData?.uniqueName

  const [previewImage, setPreviewImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTemplateChange = (value) => {
    setFormData(prev => ({ ...prev, templateId: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(file);

      // Here you would typically upload the file to your server
      // For now, we'll just update the state

    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body={
      ...formData,
      // profilePicUrl: previewImage
    }

    console.log(previewImage,formData.profilePicUrl,'eeeeeeeeee')
    if(previewImage!==formData.profilePicUrl &&previewImage){
      const uploadFile=await uploadFiles([previewImage])
      if(uploadFile?.length){
        body.profilePicUrl=uploadFile[0]
      }
    }

    const response=await updateUser({
      url: USERS_PROFILE,
      method: 'PUT',
      data: body
     });
     console.log(response,'qqqqqqqq')
     if(response?.success){
            dispatch(setUser({ ...response?.data?.data, token: null }));
      
      navigate(-1)
     }
   
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-32 h-32">
                <AvatarImage src={previewImage? URL.createObjectURL(previewImage):formData.profilePicUrl} />
                <AvatarFallback>
                  <User className="w-16 h-16" />
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center space-x-2">
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="profile-picture"
                  onChange={handleImageChange}
                />
                <Label
                  htmlFor="profile-picture"
                  className="flex items-center space-x-2 cursor-pointer bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Picture</span>
                </Label>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="border-2 border-primary/70 bg-white shadow-md h-11 px-4 text-base focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="border-2 border-primary/70 bg-white shadow-md h-11 px-4 text-base focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  className="border-2 border-primary/70 bg-white shadow-md h-11 px-4 text-base focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="border-2 border-primary/70 bg-white shadow-md h-11 px-4 text-base focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedinUrl">Linkedin URL</Label>
                <Input
                  id="linkedinUrl"
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleInputChange}
                  className="border-2 border-primary/70 bg-white shadow-md h-11 px-4 text-base focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitterUrl">Twitter URL</Label>
                <Input
                  id="twitterUrl"
                  name="twitterUrl"
                  value={formData.twitterUrl}
                  onChange={handleInputChange}
                  className="border-2 border-primary/70 bg-white shadow-md h-11 px-4 text-base focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facebookUrl">Facebook URL</Label>
                <Input
                  id="facebookUrl"
                  name="facebookUrl"
                  value={formData.facebookUrl}
                  onChange={handleInputChange}
                  className="border-2 border-primary/70 bg-white shadow-md h-11 px-4 text-base focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="templateId">Portfolio Template</Label>
                <Select
                  value={formData.templateId}
                  onValueChange={handleTemplateChange}
                >
                  <SelectTrigger className="border-2 border-primary/70 bg-white shadow-md h-11 px-4 text-base focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all">
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Minimal Template</SelectItem>
                    <SelectItem value="2">Modern Template</SelectItem>
                    <SelectItem value="3">Minimalist Template</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="uniqueName">Username</Label>
                <Input
                  id="uniqueName"
                  disabled={!!uniqueNameOfUser}
                  name="uniqueName"
                  value={formData?.uniqueName}
                  onChange={handleInputChange}
                  className="border-2 border-primary/70 bg-white shadow-md h-11 px-4 text-base focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="border-2 border-primary/70 bg-white shadow-md p-4 text-base focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Profile;